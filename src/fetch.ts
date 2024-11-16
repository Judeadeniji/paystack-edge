import { BetterFetch, createFetch } from '@better-fetch/fetch';
import { z } from 'zod';
class Fetch {
  private static instance: Fetch | null = null;
  private readonly fetch: BetterFetch<
    {
      baseURL: string;
      auth: { type: 'Bearer'; token: string };
      defaultError: z.ZodObject<
        { status: z.ZodBoolean; message: z.ZodString; data: z.ZodNull },
        'strip',
        z.ZodTypeAny,
        { status: boolean; message: string; data: null },
        { status: boolean; message: string; data: null }
      >;
    },
    unknown,
    { status: boolean; message: string; data: null },
    unknown
  >;

  private constructor(private readonly key: string) {
    this.fetch = createFetch({
      baseURL: 'https://api.paystack.co',
      auth: {
        type: 'Bearer',
        token: this.key,
      },
      defaultError: z.object({
        status: z.boolean(),
        message: z.string(),
        data: z.null().optional(),
        meta: z
          .object({
            nextStep: z.string(),
          })
          .optional(),
        type: z.string().optional(),
        code: z.string().optional(),
      }),
    });
  }

  public static getInstance(key?: string) {
    if (!Fetch.instance && !key) {
      throw new Error('API key is required for first initialization');
    }

    if (!Fetch.instance && key) {
      Fetch.instance = new Fetch(key);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Fetch.instance!;
  }

  public getFetch() {
    return this.fetch;
  }
}

export type TPaysackFetch = Fetch['fetch'];

export { Fetch as PaystackFetch };
