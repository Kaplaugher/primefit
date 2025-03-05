import { ApifyClient } from 'apify-client';

export default defineEventHandler(async (event) => {
  try {
    // Get the request body
    const body = await readBody(event);

    // Validate the input
    if (!body.url) {
      throw createError({
        statusCode: 400,
        message: 'URL is required',
      });
    }

    // Get API token from runtime config
    const config = useRuntimeConfig();
    const apifyToken = config.apifyToken;

    if (!apifyToken) {
      throw createError({
        statusCode: 500,
        message: 'Apify API token is not configured',
      });
    }

    // Initialize the Apify client
    const client = new ApifyClient({ token: apifyToken });

    // Prepare the input for the scraper
    const input = {
      startUrls: [{ url: body.url }],
      maxRequestsPerCrawl: body.maxRequests || 10,
      // Add any other parameters needed for the specific actor
    };

    // Run the web scraper actor
    // You can replace 'apify/web-scraper' with any other actor ID as needed
    const run = await client.actor('apify/website-content-crawler').call(input);

    // Fetch the results from the dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    console.log('items', items);
    // Return the scraped data
    return {
      success: true,
      data: items,
    };
  } catch (error: any) {
    // Handle errors
    console.error('Scraper error:', error);

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to scrape the URL',
    });
  }
});
