/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Header from "src/containers/Header";
import NextLink from "next/link";
import { useTranslation } from "@nezhos/i18n";
import { Grid, GridItem, Heading, Link, Center, Text, Box } from "@chakra-ui/react";

const PersonalInfo = ({ t }: any) => (
  <Box maxW="md">
    <Text fontSize='xl' size="xl" mb="4">
      {t("home.me.subtitle1")}{" "}
      <NextLink href="/journal" passHref>
        <Link>
          {t("journal.title")}
        </Link>
      </NextLink>
      .
    </Text>
    <Text fontSize='xl' size="xl">
      {t("home.me.visit")}{" "}
      <NextLink href="/journal" passHref>
        <Link>
          {t('journal.title')}
        </Link>
      </NextLink>{" "}
      {t("home.me.subtitle2")}
    </Text>
  </Box>
);

const Quote = ({ t }: any) => (
  <Grid p="8" mt="4" pb="2" mx="auto" maxW="3xl">
    <Center>
      <Heading as="h3" size="lg">{t('home.quote.title')}</Heading>
    </Center>
    <Center px="5" py="4">
      <Box borderRadius="lg" boxShadow="lg" p="5" mb="6">
        <Text fontSize="3xl" h="3">
          “
        </Text>
        <Text fontSize="sm" px="5">
          {t('home.quote.desc')}
        </Text>
        <Text fontSize="3xl" h="3" align="right">
          ”
        </Text>
        <Center>
          <Text size="md" as="b">
            {t('home.quote.author')}
          </Text>
        </Center>
      </Box>
    </Center>
  </Grid >
);

const Idea = ({ t }: any) => (
  <Grid mx="auto" maxW="md">
    <Text size="xl" mb="4">
      {t("home.idea.names")}
    </Text>
    <Text size="xl">
      {t("home.idea.anonymity")}
    </Text>
  </Grid>
);

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Header />
      <Grid mx="auto" p="8" mt="8">
        <Center>
          <Heading as='h2' size='lg' mb="8">Hey, I'm Nezhivar 👋</Heading>
        </Center>
        <PersonalInfo t={t} />
      </Grid>
      <Quote t={t} />
      <Idea t={t} />
    </>
  )
};

export default Home;
