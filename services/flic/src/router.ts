import * as dotenv from 'dotenv';
dotenv.config();

import { TRPCError, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import { OpenApiMeta } from 'trpc-openapi';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js'


import { User, database } from './database';

// Move this initialization to exist in the context;
let supabase = null;
const jwtSecret = uuid();

export type Context = {
  user: User | null;
  requestId: string;
};

const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (error.code === 'INTERNAL_SERVER_ERROR' && process.env.NODE_ENV === 'production') {
        return { ...shape, message: 'Internal server error' };
      }
      return shape;
    },
  });

export const createContext = async ({
  req,
  res,
}: // eslint-disable-next-line @typescript-eslint/require-await
CreateExpressContextOptions): Promise<Context> => {
  const requestId = uuid();
  res.setHeader('x-request-id', requestId);

  let user: User | null = null;

  try {
    if (req.headers.apikey === process.env.SUPABASE_KEY) {
      supabase = createClient(process.env.SUPABASE_URL ?? '', req.headers.apikey ?? '')

    } else {
      supabase = null;
    }
  } catch (cause) {
    console.error(cause);
  }

  return { user, requestId };
};

const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      message: 'User not found',
      code: 'UNAUTHORIZED',
    });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

const authRouter = t.router({
  register: publicProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/auth/register',
        tags: ['auth'],
        summary: 'Register as a new user',
      },
    })
    .input(
      z.object({
        email: z.string().email(),
        passcode: z.preprocess(
          (arg) => (typeof arg === 'string' ? parseInt(arg) : arg),
          z.number().min(1000).max(9999),
        ),
        name: z.string().min(3),
      }),
    )
    .output(
      z.object({
        user: z.object({
          id: z.string().uuid(),
          email: z.string().email(),
          name: z.string().min(3),
        }),
      }),
    )
    .mutation(({ input }) => {
      let user = database.users.find((_user) => _user.email === input.email);

      if (user) {
        throw new TRPCError({
          message: 'User with email already exists',
          code: 'UNAUTHORIZED',
        });
      }

      user = {
        id: uuid(),
        email: input.email,
        passcode: input.passcode,
        name: input.name,
      };

      database.users.push(user);

      return { user: { id: user.id, email: user.email, name: user.name } };
    }),
  login: publicProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/auth/login',
        tags: ['auth'],
        summary: 'Login as an existing user',
      },
    })
    .input(
      z.object({
        email: z.string().email(),
        passcode: z.preprocess(
          (arg) => (typeof arg === 'string' ? parseInt(arg) : arg),
          z.number().min(1000).max(9999),
        ),
      }),
    )
    .output(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const user = database.users.find((_user) => _user.email === input.email);

      if (!user) {
        throw new TRPCError({
          message: 'User with email not found',
          code: 'UNAUTHORIZED',
        });
      }
      if (user.passcode !== input.passcode) {
        throw new TRPCError({
          message: 'Passcode was incorrect',
          code: 'UNAUTHORIZED',
        });
      }

      return {
        token: jwt.sign(user.id, jwtSecret),
      };
    }),
});

const usersRouter = t.router({
  getUsers: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/users',
        tags: ['users'],
        summary: 'Read all users',
      },
    })
    .input(z.void())
    .output(
      z.object({
        users: z.array(
          z.object({
            id: z.string().uuid(),
            email: z.string().email(),
            name: z.string(),
          }),
        ),
      }),
    )
    .query(() => {
      const users = database.users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
      }));

      return { users };
    }),
  getUserById: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/users/{id}',
        tags: ['users'],
        summary: 'Read a user by id',
      },
    })
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .output(
      z.object({
        user: z.object({
          id: z.string().uuid(),
          email: z.string().email(),
          name: z.string(),
        }),
      }),
    )
    .query(({ input }) => {
      const user = database.users.find((_user) => _user.id === input.id);

      if (!user) {
        throw new TRPCError({
          message: 'User not found',
          code: 'NOT_FOUND',
        });
      }

      return { user };
    }),
});

const helloRouter = t.router({
    sayHello: t.procedure
    .meta({
        openapi: {
          method: 'GET',
          path: '/hello',
          tags: ['posts'],
          protect: false,
        },
      })
      .input(z.object({ name: z.string() }))
      .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
        return { greeting: `Hello ${input.name}!` };
      })
});
  
const doorsRouter = t.router({
  getDoors: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/doors',
        tags: ['door'],
        summary: 'Read all door clicks',
      },
    })
    .input(
      z.object({
        userId: z.string().uuid().optional(),
      }),
    )
    .output(
      z.object({
        doors: z.array(
          z.object({
            id: z.number(),
            created_at: z.string(),
            status: z.string(),
          }),
        ),
      }),
    )
    .query(async () => {
      let { data, error } = await supabase
        .from('Door')
        .select('*')

      return { doors: data };
    }),
    getDoorRecent: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/door/recent',
        tags: ['door'],
        summary: 'Get the latest door click',
      },
    })
    .input(
      z.object({
        userId: z.string().uuid().optional(),
      }),
    )
    .output(
      z.object({
        error: z.string().nullable(),
        click: z.object({
            id: z.number(),
            created_at: z.string(),
            status: z.string(),
        }).nullable()
      }),
    )
      .query(async () => {
        if (!supabase) {
          return {
            error: 'Invalid credentials',
            click: null
          }
        };


      let { data, error } = await supabase
        .from('Door')
        .select('*')
        .order('id', { ascending: false })
        .range(0, 0)

      if (error) {
        return error;
      }

      
      const recentClick = data?.[0];
      
      return {
        error: null,
        click: {
          ...recentClick,
          created_at: `${new Date(recentClick.created_at).toLocaleDateString('en-us', { weekday:"long" })} at ${new Date(recentClick.created_at).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`
      } };
    }),
  click: publicProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/door/click',
        tags: ['door'],
        protect: false,
        summary: 'Set OPENED status',
      },
    })
    .input( z.object({}))
    .output(z.null())
    .mutation(async () => {
      if (!supabase) {
        return {
          error: 'Invalid credentials',
          click: null
        }
      };

      const { data, error } = await supabase
      .from('Door')
      .insert([
        { status: 'OPENED' },
      ])
      
      console.log('router line:340', data, error);
      return null;
    }),
  press: publicProcedure
  .meta({
    openapi: {
      method: 'POST',
      path: '/door/press',
      tags: ['door'],
      protect: false,
      summary: 'Set ARMED status',
    },
  })
  .input( z.object({}))
  .output(z.null())
    .mutation(async () => {
      if (!supabase) {
        return {
          error: 'Invalid credentials',
          click: null
        }
      };

    const { data, error } = await supabase
    .from('Door')
    .insert([
      { status: 'ARMED' },
    ])
    
    return null;
  }),
});

export const appRouter = t.router({
  auth: authRouter,
  users: usersRouter,
  hello: helloRouter,
  doors: doorsRouter,
});

export type AppRouter = typeof appRouter;