import AgendaIcon from '../images/icons8-schedule-100.png';
import ClientsIcon from '../images/icons8-people-100.png';
import StoreIcon from '../images/icons8-rent-100.png';
import EmployeesIcon from '../images/icons8-business-building-100.png';
import FinancesIcon from '../images/icons8-account-100.png';

import SchedulerIcon from '../images/icons8-month-view-100.png';
import AddEvent from '../images/icons8-add-new-100.png';
import EventsList from '../images/icons8-show-property-100.png'

export const navButtons = [
    // { link: "/agenda", icon: <EventNoteIcon fontSize="large" style={{ color: '#E8EEF4' }} />, title: 'Agenda', text: 'Agenda' },
    { link: "/agenda", src: AgendaIcon, title: 'Agenda', alt: 'Agenda' },
    { link: "/clients", src: ClientsIcon, title: 'Clients', alt: 'Clients' },
    { link: "/store", src: StoreIcon, title: 'Store', alt: 'Store' },
    { link: "/employees", src: EmployeesIcon, title: 'Employees', alt: 'Employees' },
    { link: "/finances", src: FinancesIcon, title: 'Finances', alt: 'Finances' },
]

export const agendaButtons = [
    { link: "/scheduler", src: SchedulerIcon, title: 'Scheduler', alt: 'Scheduler' },
    { link: "/events-list", src: EventsList, title: 'Events List', alt: 'Events List' },
    { link: "/add-event", src: AddEvent, title: 'Add Event', alt: 'Add Event' },
]

export const clientsButtons = [
    { link: "/clients-list", src: EventsList, title: 'Clients List', alt: 'Clients List' },
    { link: "/add-client", src: AddEvent, title: 'Add Client', alt: 'Add Client' },
]

export const storeButtons = [
    { link: "/products-list", src: EventsList, title: 'Products List', alt: 'Products List' },
    { link: "/add-product", src: AddEvent, title: 'Add Product', alt: 'Add Product' },
    { link: "/sold-products", src: FinancesIcon, title: 'Sold Products', alt: 'Sold Products' },
]

export const employeesButtons = [
    { link: "/employees-list", src: EventsList, title: 'Employees List', alt: 'Employees List' },
    { link: "/add-employee", src: AddEvent, title: 'Add Employee', alt: 'Add Employee' },
]