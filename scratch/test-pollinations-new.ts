async function run() {
  try {
    console.log("Fetching available models...");
    const modelsRes = await fetch("https://text.pollinations.ai/models");
    if (modelsRes.ok) {
      console.log("Models:", await modelsRes.text());
    } else {
      console.log("Failed to fetch models:", modelsRes.status, modelsRes.statusText);
    }
  } catch (err: any) {
    console.log("Error fetching models:", err.message);
  }

  const payloads = [
    {
      name: "POST root WITHOUT model parameter",
      body: {
        messages: [{ role: "user", content: "Tell me a joke in 5 words." }]
      }
    },
    {
      name: "POST root WITH model=openai",
      body: {
        messages: [{ role: "user", content: "Tell me a joke in 5 words." }],
        model: "openai"
      }
    },
    {
      name: "POST root WITH model=qwen",
      body: {
        messages: [{ role: "user", content: "Tell me a joke in 5 words." }],
        model: "qwen"
      }
    },
    {
      name: "POST root WITH model=mistral",
      body: {
        messages: [{ role: "user", content: "Tell me a joke in 5 words." }],
        model: "mistral"
      }
    }
  ];

  for (const p of payloads) {
    try {
      console.log(`\n--- Running payload test: ${p.name} ---`);
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p.body)
      });
      if (response.ok) {
        console.log(`✅ Success: "${(await response.text()).trim()}"`);
      } else {
        console.log(`❌ Failed: ${response.status} ${response.statusText}`);
        try {
          console.log(`   Response: ${await response.text()}`);
        } catch {}
      }
    } catch (err: any) {
      console.log(`❌ Error: ${err.message}`);
    }
  }
}

run();
