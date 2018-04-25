/* =============
* Routes File
* ==============
*
* The routes and redirects are defined in this file.
 */

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

import Colors from '@/views/theme/Colors'
import Typography from '@/views/theme/Typography'

import Charts from '@/views/Charts'
import Widgets from '@/views/Widgets'

// Views - Components
import Cards from '@/views/base/Cards'
import Forms from '@/views/base/Forms'
import Switches from '@/views/base/Switches'
import Tables from '@/views/base/Tables'
import Breadcrumbs from '@/views/base/Breadcrumbs'
import Carousels from '@/views/base/Carousels'
import Collapses from '@/views/base/Collapses'
import Jumbotrons from '@/views/base/Jumbotrons'
import ListGroups from '@/views/base/ListGroups'
import Navs from '@/views/base/Navs'
import Navbars from '@/views/base/Navbars'
import Paginations from '@/views/base/Paginations'
import Popovers from '@/views/base/Popovers'
import ProgressBars from '@/views/base/ProgressBars'
import Tooltips from '@/views/base/Tooltips'

// Views - Buttons
import StandardButtons from '@/views/buttons/StandardButtons'
import ButtonGroups from '@/views/buttons/ButtonGroups'
import Dropdowns from '@/views/buttons/Dropdowns'
import SocialButtons from '@/views/buttons/SocialButtons'

// Views - Icons
import Flags from '@/views/icons/Flags'
import FontAwesome from '@/views/icons/FontAwesome'
import SimpleLineIcons from '@/views/icons/SimpleLineIcons'

// Views - Notifications
import Alerts from '@/views/notifications/Alerts'
import Badges from '@/views/notifications/Badges'
import Modals from '@/views/notifications/Modals'

// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/login/Login'
import Register from '@/views/pages/Register'

import StaffsIndex from '@/views/staffs/Index'
import StaffsEdit from '@/views/staffs/Edit'
import StaffsCreate from '@/views/staffs/Create'

import TimeCardsIndex from '@/views/timecards/Index'
import TimeCardsEdit from '@/views/timecards/Edit'
import TimeCardsCreate from '@/views/timecards/Create'

import QuestsIndex from '@/views/quests/Index'
import QuestsEdit from '@/views/quests/Edit'
import QuestsCreate from '@/views/quests/Create'

import AlarmsIndex from '@/views/alarms/Index'
import AlarmsEdit from '@/views/alarms/Edit'
import AlarmsCreate from '@/views/alarms/Create'

import BranchIndex from '@/views/branches/Index'
import BranchCreate from '@/views/branches/Create'
import BranchEdit from '@/views/branches/Edit'

import AttendancesIndex from '@/views/attendances/Index'
import AttendancesEdit from '@/views/attendances/Edit'
import AttendancesShow from '@/views/attendances/Show'
import AttendancesCreate from '@/views/attendances/Create'

import DailyReportIndex from '@/views/dailyreports/Index'
import DailyReportShow from '@/views/dailyreports/Show'
import DailyReportEdit from '@/views/dailyreports/Edit'
import DailyReportCreate from '@/views/dailyreports/Create'

import SchedulePostIndex from '@/views/scheduleposts/Index'
import SchedulePostEdit from '@/views/scheduleposts/Edit'
import SchedulePostCreate from '@/views/scheduleposts/Create'
import DraftPostIndex from '@/views/scheduleposts/DraftPost'

// Chat commponents
import ChatIndex from '@/views/chats/Index'
import GroupIndex from '@/views/chats/groups/Index'
import GroupCreate from '@/views/chats/groups/Create'
import GroupEdit from '@/views/chats/groups/Edit'

import ChannelIndex from '@/views/chats/channels/Index'
import ChannelCreate from '@/views/chats/channels/Create'
import ChannelEdit from '@/views/chats/channels/Edit'
import ChannelShow from '@/views/chats/channels/Show'

export default [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: Full,
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/staffs',
        redirect: '/staffs',
        name: 'Staff',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/staffs',
            name: 'staffs.index',
            component: StaffsIndex
          },
          {
            path: '/staffs/:staffId/edit',
            name: 'staffs.show',
            component: StaffsEdit,
            props: true
          },
          {
            path: '/staffs/create',
            name: 'staffs.create',
            component: StaffsCreate
          }
        ]
      },
      {
        path: '/time_cards',
        redirect: '/time_cards',
        name: 'Time Cards',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/time_cards',
            name: 'time_cards.index',
            component: TimeCardsIndex
          },
          {
            path: '/time_cards/:cardId/edit',
            name: 'time_cards.show',
            component: TimeCardsEdit,
            props: true
          },
          {
            path: '/time_cards/create',
            name: 'time_cards.create',
            component: TimeCardsCreate
          }
        ]
      },
      {
        path: '/quests',
        redirect: '/quests',
        name: 'Quests',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/quests',
            name: 'quests.index',
            component: QuestsIndex
          },
          {
            path: '/quests/create',
            name: 'quests.create',
            component: QuestsCreate
          },
          {
            path: '/quests/:questId/edit',
            name: 'quests.show',
            component: QuestsEdit,
            props: true
          }
        ]
      },
      {
        path: '/alarms',
        redirect: '/alarms',
        name: 'Alarms',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/alarms',
            name: 'alarms.index',
            component: AlarmsIndex
          },
          {
            path: '/alarms/create',
            name: 'alarms.create',
            component: AlarmsCreate
          },
          {
            path: '/alarms/:alarmId/edit',
            name: 'alarms.show',
            component: AlarmsEdit,
            props: true
          }
        ]
      },
      {
        path: '/branches',
        redirect: '/branches',
        name: 'Branches',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/branches',
            name: 'branches.index',
            component: BranchIndex
          },
          {
            path: '/branches/create',
            name: 'branches.create',
            component: BranchCreate
          },
          {
            path: '/branches/:branchId',
            name: 'branches.show',
            component: BranchEdit,
            props: true
          },
          {
            path: '/branches/:branchId/edit',
            name: 'branches.edit',
            component: BranchEdit,
            props: true
          }
        ]
      },
      {
        path: '/attendances',
        redirect: '/attendances',
        name: 'Attendance',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/attendances',
            name: 'attendances.index',
            component: AttendancesIndex
          },
          {
            path: '/attendances/create',
            name: 'attendances.create',
            component: AttendancesCreate
          },
          {
            path: '/attendances/:attendanceId',
            name: 'attendances.show',
            component: AttendancesShow,
            props: true
          },
          {
            path: '/attendances/:attendanceId/edit',
            name: 'attendances.edit',
            component: AttendancesEdit,
            props: true
          }
        ]
      },
      {
        path: '/dailyreports',
        redirect: '/dailyreports',
        name: 'Daily Reports',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/dailyreports',
            name: 'dailyreports.index',
            component: DailyReportIndex
          },
          {
            path: '/dailyreports/create',
            name: 'dailyreports.create',
            component: DailyReportCreate
          },
          {
            path: '/dailyreports/:dailyreportId',
            name: 'dailyreports.show',
            component: DailyReportShow,
            props: true
          },
          {
            path: '/dailyreports/:dailyreportId/edit',
            name: 'dailyreports.edit',
            component: DailyReportEdit,
            props: true
          }
        ]
      },
      {
        path: '/posts',
        redirect: '/posts/schedule',
        name: 'Posts',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/posts/schedule',
            name: 'schedule.index',
            component: SchedulePostIndex
          },
          {
            path: '/posts/create',
            name: 'posts.create',
            component: SchedulePostCreate
          },
          {
            path: '/posts/draft',
            name: 'draft.index',
            component: DraftPostIndex
          },
          {
            path: '/posts/schedule/:scheduleId/edit',
            name: 'schedule.edit',
            component: SchedulePostEdit,
            props: true
          }
        ]
      },
      {
        path: 'chats',
        redirect: 'features/chats',
        name: 'Features',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/chats',
            name: 'Chats',
            component: ChatIndex
          },
          {
            path: '/groups',
            name: 'groups.index',
            component: GroupIndex
          },
          {
            path: '/groups/create',
            name: 'groups.create',
            component: GroupCreate
          },
          {
            path: '/groups/:groupId/edit',
            name: 'groups.show',
            component: GroupEdit,
            props: true
          },
          {
            path: '/channels',
            name: 'channels.index',
            component: ChannelIndex
          },
          {
            path: '/channels/create',
            name: 'channels.create',
            component: ChannelCreate
          },
          {
            path: '/channels/:channelId/edit',
            name: 'channels.edit',
            component: ChannelEdit,
            props: true
          },
          {
            path: '/channels/:channelId',
            name: 'channels.show',
            component: ChannelShow,
            props: true
          }
        ]
      },
      {
        path: 'theme',
        redirect: '/theme/colors',
        name: 'Theme',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'colors',
            name: 'Colors',
            component: Colors
          },
          {
            path: 'typography',
            name: 'Typography',
            component: Typography
          }
        ]
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
      },
      {
        path: 'base',
        redirect: '/base/cards',
        name: 'Base',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'cards',
            name: 'Cards',
            component: Cards
          },
          {
            path: 'forms',
            name: 'Forms',
            component: Forms
          },
          {
            path: 'switches',
            name: 'Switches',
            component: Switches
          },
          {
            path: 'tables',
            name: 'Tables',
            component: Tables
          },
          {
            path: 'breadcrumbs',
            name: 'Breadcrumbs',
            component: Breadcrumbs
          },
          {
            path: 'carousels',
            name: 'Carousels',
            component: Carousels
          },
          {
            path: 'collapses',
            name: 'Collapses',
            component: Collapses
          },
          {
            path: 'jumbotrons',
            name: 'Jumbotrons',
            component: Jumbotrons
          },
          {
            path: 'list-groups',
            name: 'List Groups',
            component: ListGroups
          },
          {
            path: 'navs',
            name: 'Navs',
            component: Navs
          },
          {
            path: 'navbars',
            name: 'Navbars',
            component: Navbars
          },
          {
            path: 'paginations',
            name: 'Paginations',
            component: Paginations
          },
          {
            path: 'popovers',
            name: 'Popovers',
            component: Popovers
          },
          {
            path: 'progress-bars',
            name: 'Progress Bars',
            component: ProgressBars
          },
          {
            path: 'tooltips',
            name: 'Tooltips',
            component: Tooltips
          }
        ]
      },
      {
        path: 'buttons',
        redirect: '/buttons/buttons',
        name: 'Buttons',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'standard-buttons',
            name: 'Standard Buttons',
            component: StandardButtons
          },
          {
            path: 'button-groups',
            name: 'Button Groups',
            component: ButtonGroups
          },
          {
            path: 'dropdowns',
            name: 'Dropdowns',
            component: Dropdowns
          },
          {
            path: 'social-buttons',
            name: 'Social Buttons',
            component: SocialButtons
          }
        ]
      },
      {
        path: 'icons',
        redirect: '/icons/font-awesome',
        name: 'Icons',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'flags',
            name: 'Flags',
            component: Flags
          },
          {
            path: 'font-awesome',
            name: 'Font Awesome',
            component: FontAwesome
          },
          {
            path: 'simple-line-icons',
            name: 'Simple Line Icons',
            component: SimpleLineIcons
          }
        ]
      },
      {
        path: 'notifications',
        redirect: '/notifications/alerts',
        name: 'Notifications',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'alerts',
            name: 'Alerts',
            component: Alerts
          },
          {
            path: 'badges',
            name: 'Badges',
            component: Badges
          },
          {
            path: 'modals',
            name: 'Modals',
            component: Modals
          }
        ]
      }
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render (c) {
        return c('router-view')
      }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/*',
    redirect: '/pages/404'
  }
]
