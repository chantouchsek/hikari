// Main file for left menu
export default {
  items: [
    {
      title: true,
      name: 'Navigator',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: 'Staffs',
      url: '/staffs',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/staffs',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/staffs/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Time Cards',
      url: '/time_cards',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/time_cards',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/time_cards/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Quests',
      url: '/quests',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/quests',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/quests/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Alarms',
      url: '/alarms',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/alarms',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/alarms/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Branches',
      url: '/branches',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/branches',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/branches/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Attendances',
      url: '/attendances',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/attendances',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/attendances/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Daily Reports',
      url: '/dailyreports',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/dailyreports',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/dailyreports/create',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Posts',
      url: '/posts',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Schedules',
          url: '/posts/schedule',
          icon: 'icon-cursor'
        },
        {
          name: 'Drafts',
          url: '/posts/draft',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      title: true,
      name: 'Features',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Chats',
      url: '/chats',
      icon: 'icon-drop',
      children: [
        {
          name: 'Groups',
          url: '/groups',
          icon: 'icon-cursor'
        },
        {
          name: 'Channels',
          url: '/channels',
          icon: 'icon-cursor'
        }
      ]
    }
  ]
}
