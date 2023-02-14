import store from "@/store"
// const user = store.getters['auth/user']

const list = [
    {
        enabled: true,
        title: 'Clientes',
        route: 'customers',
        icon: 'LayersIcon'
    },
    {
        enabled: true,
        title: 'Agenda',
        route: 'calendar',
        icon: 'CalendarIcon'
    },
    {
        enabled: true,
        title: 'Administração',
        icon: 'TrendingUpIcon',
        children: [
            {
                enabled: true,
                title: 'Serviços',
                route: 'services'
            },
            {
                enabled: true,
                title: 'Usuários',
                route: 'users',
                icon: 'UsersIcon'
            },
        ]
    },
  {
    enabled: true,
    title: 'Formulários',
    route: 'forms'
  },
]

export default list
