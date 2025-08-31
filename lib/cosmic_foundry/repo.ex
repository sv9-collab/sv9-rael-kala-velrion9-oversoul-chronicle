defmodule CosmicFoundry.Repo do
  use Ecto.Repo,
    otp_app: :cosmic_foundry,
    adapter: Ecto.Adapters.Postgres
end
