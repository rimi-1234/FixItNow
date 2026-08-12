import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from './prisma.js';
/** Idempotent seed used by `npm run db:seed` and API startup. */
export async function ensureDefaults() {
    const adminPassword = await bcrypt.hash('Admin@1234', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@fixitnow.com' },
        update: {},
        create: {
            email: 'admin@fixitnow.com',
            password: adminPassword,
            role: Role.ADMIN,
            status: 'ACTIVE',
        },
    });
    const technicianPassword = await bcrypt.hash('tech123', 12);
    const technician = await prisma.user.upsert({
        where: { email: 'technician@fixitnow.com' },
        update: {},
        create: {
            email: 'technician@fixitnow.com',
            password: technicianPassword,
            role: Role.TECHNICIAN,
            status: 'ACTIVE',
            technicianProfile: {
                create: {
                    skills: ['Plumbing', 'Electrical', 'AC Repair'],
                    experience: 5,
                    hourlyRate: 25,
                    bio: 'Experienced home service technician with 5+ years of expertise.',
                    location: 'Dhaka',
                },
            },
        },
    });
    const customerPassword = await bcrypt.hash('customer123', 12);
    await prisma.user.upsert({
        where: { email: 'customer@fixitnow.com' },
        update: {},
        create: {
            email: 'customer@fixitnow.com',
            password: customerPassword,
            role: Role.CUSTOMER,
            status: 'ACTIVE',
        },
    });
    const categories = [
        { name: 'Plumbing', slug: 'plumbing' },
        { name: 'Electrical', slug: 'electrical' },
        { name: 'Cleaning', slug: 'cleaning' },
    ];
    const createdCategories = [];
    for (const cat of categories) {
        createdCategories.push(await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        }));
    }
    const [plumbing, electrical, cleaning] = createdCategories;
    if (!plumbing || !electrical || !cleaning) {
        throw new Error('Failed to ensure seed categories');
    }
    const services = [
        {
            name: 'Pipe Repair',
            description: 'Professional pipe repair and leak fixing service for your home.',
            price: 75,
            categoryId: plumbing.id,
            technicianId: technician.id,
        },
        {
            name: 'Electrical Wiring',
            description: 'Safe and reliable electrical wiring installation and repair.',
            price: 120,
            categoryId: electrical.id,
            technicianId: technician.id,
        },
        {
            name: 'Deep Home Cleaning',
            description: 'Thorough deep cleaning service for your entire home.',
            price: 90,
            categoryId: cleaning.id,
            technicianId: technician.id,
        },
    ];
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { name: service.name, technicianId: technician.id },
        });
        if (!existing) {
            await prisma.service.create({ data: service });
        }
    }
    const posts = [
        {
            slug: 'how-to-stop-a-leaking-pipe',
            title: 'How to stop a leaking pipe before the technician arrives',
            excerpt: 'A small leak can waste water and damage floors. These steps keep the problem contained until a plumber gets there.',
            content: `A leaking pipe is one of the most common home emergencies. You do not need to wait helplessly until a technician arrives.

First, shut off the nearest isolation valve. If you cannot find one, turn off the main water supply. Place a bucket under the drip and dry the area so you can see whether the leak is slowing.

Avoid using chemical sealants on drinking-water lines. A temporary wrap with plumber’s tape or a rubber patch is enough for a few hours. Then book a licensed plumber on FixItNow so the joint can be repaired properly.

If the leak is near electrical fittings, keep the area dry and call for help immediately.`,
            imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
        },
        {
            slug: 'signs-your-home-needs-an-electrician',
            title: '5 signs your home needs an electrician',
            excerpt: 'Flickering lights and warm outlets are not “just old wiring.” Here is when to book a qualified electrician.',
            content: `Electrical problems often start small. Catching them early prevents fire risk and expensive rewiring later.

Watch for flickering lights, outlets that feel warm, breakers that trip repeatedly, a burning smell near panels, and switches that spark.

Do not open the breaker box yourself if you smell burning plastic. Switch off the affected circuit if it is safe, then book an electrician through FixItNow. A licensed technician can test load, replace damaged fittings, and confirm the circuit is safe to use again.`,
            imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
        },
        {
            slug: 'deep-cleaning-checklist-for-busy-homes',
            title: 'A practical deep-cleaning checklist for busy homes',
            excerpt: 'Use this room-by-room list to prepare for a professional clean — or to keep your home in shape between visits.',
            content: `Deep cleaning works best with a plan. Start with high-touch surfaces: handles, switches, remotes, and kitchen taps.

In the kitchen, empty the fridge, wipe shelves, and clear the sink. In bathrooms, remove bottles from the shower so grout and glass can be cleaned properly. Floors last — dust first, then mop.

If you are booking a FixItNow cleaner, share this checklist in the booking notes. It helps the technician bring the right supplies and finish faster.`,
            imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
        },
        {
            slug: 'how-to-choose-a-home-service-technician',
            title: 'How to choose a home service technician you can trust',
            excerpt: 'Look at ratings, location, and what is included in the price before you confirm a booking.',
            content: `The right technician is not always the cheapest one. Start with verified profiles, recent reviews, and a clear hourly or job rate.

Check that the service description matches the job you need. A “pipe repair” visit is different from a full bathroom renovation. Confirm availability for your time slot, and use in-app payment so the job is tracked from request to completion.

On FixItNow you can compare ratings, read customer comments, and book a slot without sharing payment details in chat.`,
            imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
        },
    ];
    for (const post of posts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {},
            create: {
                ...post,
                published: true,
                publishedAt: new Date(),
                authorId: admin.id,
            },
        });
    }
    return { adminEmail: admin.email };
}
//# sourceMappingURL=ensure-defaults.js.map