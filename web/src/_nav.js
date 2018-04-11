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
      name: 'Stores',
      url: '/stores',
      icon: 'icon-cursor',
      children: [
        {
          name: 'List',
          url: '/stores',
          icon: 'icon-cursor'
        },
        {
          name: 'New',
          url: '/stores/create',
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
    },
    {
      title: true,
      name: 'Theme',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop'
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Components',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle'
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle'
        },
        {
          name: 'List Groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle'
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Progress Bars',
          url: '/base/progress-bars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Standard Buttons',
          url: '/buttons/standard-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor'
        },
        {
          name: 'Dropdowns',
          url: '/buttons/dropdowns',
          icon: 'icon-cursor'
        },
        {
          name: 'Social Buttons',
          url: '/buttons/social-buttons',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
          badge: {
            variant: 'success',
            text: 'NEW'
          }
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/vue/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success'
    }
  ]
}
