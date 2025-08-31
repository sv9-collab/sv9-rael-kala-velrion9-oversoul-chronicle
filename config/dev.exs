import Config

# 🛠️ Database Sanctrum
config :cosmic_foundry, CosmicFoundry.Repo,
  username: "postgres",
  password: "newpassword", # Replace with your updated sigil
  hostname: "localhost",
  database: "cosmic_foundry_dev",
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 15,
  prepare: :unnamed

# 🔥 Phoenix Endpoint (Dev Mode)
config :cosmic_foundry, CosmicFoundryWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4000], # Use {0, 0, 0, 0} to allow external access
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "quIMVMKCpeWkmvjwY5f7GvNKm5qP3PGcA3UeZhk44ngoBEQFrwUNmWbTdK58uhhn",
  watchers: [
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]},
    tailwind: {Tailwind, :install_and_run, [:default, ~w(--watch)]},
    node: {"npx", ["react-scripts", "start"], cd: Path.expand("../app", __DIR__)}
  ]

# 🔁 Live Reload Patterns (Phoenix + React)
config :cosmic_foundry, CosmicFoundryWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/cosmic_foundry_web/(controllers|live|components)/.*(ex|heex)$",
      ~r"../app/components/.*(jsx)$",
      ~r"../app/routes/.*(jsx)$"
    ]
  ]

# 🧪 Dev Routes Enabled
config :cosmic_foundry, dev_routes: true

# 🔮 Shamanic Logging Format
config :logger, :console,
  format: "[$level] $metadata[$message]\n",
  metadata: [:furyoku, :signature, :timestamp]

# 🧠 Stacktrace Depth for Dev
config :phoenix, :stacktrace_depth, 20

# ⚡ Plug Init Mode
config :phoenix, :plug_init_mode, :runtime

# 🧾 HEEx Debug Annotations
config :phoenix_live_view