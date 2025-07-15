import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ServiceState {
    service: string,
    setService: (serviceName: string) => void,
    serviceData: any,
    setServiceData: (servicename: string, tasks: any[]) => void
}

const useServiceStore = create<ServiceState>()(
    devtools(
        persist(
            (set) => ({
                service: 'todoist',
                setService: (serviceName: string) => set(() => ({ service: serviceName })),
                serviceData: [
                    {
                        service: 'todoist',
                        tasks: []
                    }, {
                        service: 'linear',
                        tasks: []
                    }
                ],
                setServiceData: (serviceName: string, updatedTasks: any[]) => set(({ serviceData }) => ({
                    serviceData: serviceData.map((item: any) => {
                        if (item.service === serviceName) {
                            return {
                                service: serviceName,
                                tasks: updatedTasks
                            }
                        }

                        return item;
                    })
                }))
            }),
            {
                name: 'service-storage',
            }
        )
    )
)

export default useServiceStore;