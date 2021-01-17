import basic from '../../common/types/basic'
import Contact from '../../common/types/Contact'
import OrgRole from '../../common/types/OrgRole'
import RepeatRule from '../../common/types/RepeatRule'

import User from './User'
import Tenant from './Tenant'
import Client from './Client'
import Group from './Group'
import Project from './Project'

import Attachment from './Attachment'
import Calendar from './Calendar'
import Canvas from './Canvas'
import CanvasItem from './CanvasItem'
import Comment from './Comment'
import Message from './Message'
import PunchClock from './PunchClock'
import Sprint from './Sprint'
import Ticket from './Ticket'
import TicketHistory from './TicketHistory'
import Timesheet from './Timesheet'

import Report from './Report'

const typeDefs = [basic, Contact, OrgRole, RepeatRule, User, Tenant, Group, Project, Client,
    Attachment, Calendar, Canvas, CanvasItem, Comment, Message, PunchClock, Sprint, Ticket, TicketHistory,
    Timesheet, Report]
export default typeDefs
