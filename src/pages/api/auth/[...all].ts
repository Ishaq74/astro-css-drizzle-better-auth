export const prerender = false;

import { getAuth } from "@lib/auth/auth";
import type { APIRoute } from "astro";

export const ALL: APIRoute = async (ctx) => {
    try {
        const auth = await getAuth();
        if (!auth || typeof auth.handler !== 'function') {
            return new Response(JSON.stringify({ message: 'Auth not available' }), { status: 500, headers: { 'content-type': 'application/json' } });
        }
        return await auth.handler(ctx.request);
    } catch (err) {
        console.error('Auth route error:', err);
        const isDev = process.env.NODE_ENV !== 'production';
        const message = err instanceof Error ? (isDev ? (err.stack || err.message) : err.message) : String(err);
        return new Response(JSON.stringify({ message }), { status: 500, headers: { 'content-type': 'application/json' } });
    }
        // DEBUG: quick health response to ensure this route is loaded
        // Remove or adjust after debugging
        try {
            return new Response(JSON.stringify({ ok: true, method: ctx.request.method, url: String(ctx.request.url) }), { status: 200, headers: { 'content-type': 'application/json' } });
        } catch (err) {
            return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: { 'content-type': 'application/json' } });
        }
};
