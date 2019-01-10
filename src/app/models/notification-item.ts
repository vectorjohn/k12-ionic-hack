export interface NotificationItem {
    id: string;
    name: string;
    summary: string;
    time: string;
    description: string;
    type: string;
    status: string;
    img?: string;
    icon: string;
    launch: string;
}

export class Notifications {
    overdue: NotificationItem[];
    upcoming: NotificationItem[];
    messages: NotificationItem[];
}


export interface NotificationResponse {
    overdue: NotificationItem[];
    upcoming: NotificationItem[];
    messages: NotificationItem[];
}