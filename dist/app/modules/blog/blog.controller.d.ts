import { Request, Response } from 'express';
export declare const BlogControllers: {
    getPosts: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPostBySlug: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    createPost: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updatePost: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deletePost: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=blog.controller.d.ts.map