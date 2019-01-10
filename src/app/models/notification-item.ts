// "id": 234,
//     "name": "something is overdue",
//     "summary": "Class Name",
//     "time": "due 3h ago|timestamp",
//     "description": "blah blah blah blah.",
//     "type": "a|b|c",
//     "status": "success|warning|danger",
//     "img": "/assets/images/backgrounds/class/road/jpg",
//     "icon": "iconName",
//     "launch": "/some/path?id=123"

export interface NotificationItem {
    id: string;
    name: string;
    summary: string;
    time: string;
    description: string;
    type: string;
    status: string;
    img: string;
    icon: string;
    launch: string;
}