// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.2.0";
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { multiParser, Form } from 'https://deno.land/x/multiparser@0.114.0/mod.ts'


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  try {
    console.log(req);

    const { audio_url } = await req.json();
    console.log(audio_url);

    // const supabaseClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
    //   global: { headers: { Authorization: req.headers.get("Authorization")! } },
    // });
    // const { data: videoData, error: videoError } = await supabaseClient.storage
    //   .from("assets")
    //   .createSignedUrl(video_key, 600);
    // if (videoError) throw Error(videoError.message);

    const jsonResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        authorization: Deno.env.get("ASSEMBLYAI_KEY") ?? "",
        "content-type": "application/json",
    ...corsHeaders

      },
      body: JSON.stringify({
        audio_url: audio_url,
      }),
    });
    const jsonData = await jsonResponse.json();

    return new Response(JSON.stringify(jsonData), { headers: {  "Content-Type": "application/json" ,
    ...corsHeaders

  } });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), {
      headers: {"Content-Type": "application/json" },
      status: 500,
    });
  }
});




    // const supabaseClient = createClient(
    //   Deno.env.get("SUPABASE_URL") ?? "",
    //   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    // );    // await supabaseClient.from("projects").update({
    //    transcription: data.transcription
    //  }).eq("id", project_id)



    // curl 