// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// "words": [
//   {
//       "text": "You",
//       "start": 490,
//       "end": 558,
//       "confidence": 0.99846,
//       "speaker": null
//   },
//   {
//       "text": "know,",
//       "start": 564,
//       "end": 878,
//       "confidence": 0.99727,
//       "speaker": null
//   },
//   {
//       "text": "demons",
//       "start": 964,
//       "end": 1466,
//       "confidence": 0.75006,
//       "speaker": null
//   },
//   {
//       "text": "on",
//       "start": 1498,
//       "end": 1646,
//       "confidence": 0.99884,
//       "speaker": null
//   },
//   {
//       "text": "tv",
//       "start": 1668,
//       "end": 1946,
//       "confidence": 0.95511,
//       "speaker": null
//   },

Deno.serve(async (req) => {
  const { words, language } = await req.json()

  // use openai api to translate words to another language

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Deno.env.get("OPENAI_API_KEY"),
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: "Translate the following response from English to " + language + "\n\n" + words,
      // temperature: 0.3,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0.3,
      // stop: ["\n"],
    }),
  })
  const data = await response.json()
  console.log(data)
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })

})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/translate' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
