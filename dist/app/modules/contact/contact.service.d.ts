export declare const ContactServices: {
    createMessage(payload: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        message: string;
        subject: string;
        read: boolean;
    }>;
    getMessages(query: {
        page?: string;
        limit?: string;
        read?: string;
    }): Promise<{
        messages: {
            name: string;
            email: string;
            id: string;
            createdAt: Date;
            message: string;
            subject: string;
            read: boolean;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    markRead(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        message: string;
        subject: string;
        read: boolean;
    }>;
};
//# sourceMappingURL=contact.service.d.ts.map