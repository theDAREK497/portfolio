# Case-study evidence

Content snapshot: **8 November 2026**, Europe/Moscow. Public copy lives in
`src/content/cases.ts`; services live in `src/content/services.ts`. These are
dated observations, not live counters or proof of causal business impact.

| Claim                                                                                               | Owning source / observation                                                                                                       | Publication limits                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 126 all-time RuStore installs                                                                       | Developer console, “All installs”, 1 January 2023–8 November 2026. Captured 8 November.                                           | Install events, not active or unique users. Console warns of up to 3 days of delay.                                                                                                                        |
| Google Play production release on 4 November 2026, 100% rollout                                     | App dashboard, “Latest production release”. Captured 8 November.                                                                  | Confirms delivery. The 5 installs displayed in this card concern the release, not lifetime audience. No crash-free claim can be inferred from missing crash-rate data.                                     |
| 37 Web/APK accounts; 15 Telegram accounts                                                           | AstroCode admin summary, snapshot 8 November 2026, 21:18:52 Moscow.                                                               | Groups can overlap. Do not sum them into unique people. Premium access includes linked entitlements and does not establish purchase count.                                                                 |
| 43 search clicks; 2.22K impressions; 1.9% CTR; average position 7.6                                 | Google Search Console, Web search, 10 October–6 November 2026. Captured 8 November.                                               | Search metrics, not conversion to a purchase or evidence that a particular release caused growth. “2.22K” is the console’s rounded display.                                                                |
| Booking service for an organisation with 3,000+ employees; estimated 17.5 employee-hours/week saved | Existing owner-supplied work history in `src/content/experience.ts` and the supplied discussion.                                  | Employer work. Organisation headcount is not active users. Original calculation and internal reports are not public; savings remain explicitly an estimate. No internal screens or employer data included. |
| Legacy performance work at Onpeak Digital                                                           | Existing work history: DevTools, Lighthouse, PageSpeed Insights, images, caching, JavaScript/API and SQL.                         | A qualitative account of experience, not one benchmark. No speed-up percentage, score or sales attribution.                                                                                                |
| Demiurge structured knowledge and reviewed AI write-back                                            | Public GitHub profile, linked project repository, existing project content, published technical articles and project screenshots. | Independent MVP in development, not an enterprise deployment. No measured accuracy or time-saving claim.                                                                                                   |

## Sources inspected

- [Google Search Console](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fastrocode-app.ru%2F&num_of_days=28&time_granularity=DAY)
- [AstroCode admin summary](https://astrocode-app.ru/admin)
- [RuStore statistics](https://console.rustore.ru/apps/2063720975/statistics)
- [Google Play dashboard](https://play.google.com/console/u/0/developers/6595089408231903766/app/4975708618150178686/app-dashboard)
- [GitHub profile](https://github.com/theDAREK497)
- [AstroCode PR #7: official identity and metadata](https://github.com/theDAREK497/AstroGenesis/pull/7)
- [AstroCode PR #10: server-rendered guides and Markdown](https://github.com/theDAREK497/AstroGenesis/pull/10)
- [Published compatibility guide](https://astrocode-app.ru/guides/compatibility)

The standalone SEO case (`astrocode-seo`) uses the same 10 October–6 November
Search Console snapshot, rechecked on 8 November. The query table shows
“натальная карта онлайн”: 11 clicks / 737 impressions, and “натальная карта
рассчитать”: 8 clicks / 615 impressions. These are query-level observations,
not attribution to the new guides. PR #10's work was released on 4 November;
most of the reporting window predates it. The report establishes neither
indexing of those guides nor a causal traffic or sales lift. The compatibility
guide's title, heading, content and official links were checked on the live site.
Implementation details and recorded release checks come from the merged PRs;
the entire interactive SPA has not been converted to SSR.

The private consoles require the owner's existing access. Public case pages use
cropped screenshots and public product/store links; they do not link visitors
to private consoles. Captures omit account menus, credentials and user-level
records. The operations capture contains aggregate account state and analytics
only. It distinguishes the current account snapshot from the selected 30-day
analytics window; analytics collection began on 14 October 2026.

Screenshots are in `public/images/cases/` with the observation date in each
filename. When refreshing metrics, replace the dated observations and their
captions together, inspect the images, and preserve the definitions above.

## Enquiry measurement

The site opens an email client or Telegram for a short initial message. It
does not claim to have received a lead when a visitor clicks a contact link.
No analytics provider or tracking identifier has been invented or added.
To assess enquiries, record the source, requested service, whether the task
fits, and whether it progressed to paid work. A qualified enquiry and an
outbound contact click must remain different events.
