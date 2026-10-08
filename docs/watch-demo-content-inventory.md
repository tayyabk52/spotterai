# Watch Demo source inventory

Owner requested downloading the demo videos from https://spotter.ai/watch-demo and building a short, consistently styled local page on 2026-10-08. The rendered source was inspected in both its Sentinel and Spotter TMS selections. These are the two demo recordings linked by that page, rather than the shorter product-page clips.

| Selection   | Original video URL                                                  | Local file                            | Dimensions  | Duration | Bytes      | Original poster URL                                                           |
| ----------- | ------------------------------------------------------------------- | ------------------------------------- | ----------- | -------- | ---------- | ----------------------------------------------------------------------------- |
| Sentinel    | https://spotter-assests.vercel.app/spotter_sentinel_HD_Final_01.mp4 | public/videos/watch-demo/sentinel.mp4 | 1920 × 1080 | 42.03 s  | 41,438,988 | https://spotter.ai/static/media/thumbnail-image.2086ed6690efffc80258.webp     |
| Spotter TMS | https://spotter.ai/videos/FuelSeek.mp4                              | public/videos/watch-demo/tms.mp4      | 1920 × 1080 | 60.76 s  | 3,774,681  | https://spotter.ai/static/media/tms-video-thumbnail.504a65e7c8319148f24e.webp |

Both videos and source posters are downloaded unchanged. Audio is retained. Posters live under public/images/watch-demo. SHA-256 checksums of the downloaded recordings:

- Sentinel: `388552004c15b3a5a67d782525004f76e9089c98da5d3d17d047436683309a1c`
- Spotter TMS: `75bf778fb0e8d28c7f80790f83113b7892bda8e25ccbf19c66efb904f25ce2fd`

The source includes caption track elements without caption URLs. Local English WebVTT tracks were generated from the original audio with faster-whisper tiny.en, using an isolated tool runtime outside the project. Product names were corrected to FuelSeek and Spotter TMS; cue endings are bounded to the actual recording durations. The native player labels these tracks “English (auto-generated)” because they have not received a full human audio transcription review. Narrated claims remain source content, not independently verified outcomes.

Original interface wording: “See Spotter in action.”, “Choose a product. Watch the workflow.”, “Choose your demo”, “Driver screening”, “Fuel planning”, the two concise video descriptions, playback/error/direct-file labels, product exploration links, the personalized-demo invitation, and SEO summaries. These describe the videos or navigation without adding performance guarantees. Source claims about screening time, ISS reduction, the TMS paying for itself, and fuel savings are not repeated as new page claims.

Navigation retains the Watch a Demo label and now points to /watch-demo. Selection URLs use ?demo=sentinel and ?demo=tms, work without JavaScript, and replace the current player. Product exploration goes to the existing local product routes. The personalized-demo action uses the existing local quote page with a product query. No new registration workflow or external submission is introduced.
