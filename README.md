# No Nap November TRMNL Plugin

A November-only habit tracker for the [TRMNL](https://usetrmnl.com/) e-ink
display. Each day shows a checkmark (`✓`) when no nap was recorded and an X
(`×`) when a nap was recorded.

## for preview

get [TRMNL Preview CLI](https://github.com/usetrmnl/trmnlp), then run
these commands from the repository root:

```sh
trmnlp serve
```

Open <http://localhost:4567> to view the dashboard. Edit files under `src/`
and refresh the browser; `.trmnlp.yml` enables file watching.

## updating it

Edit `nap_tracker.days` in `.trmnlp.yml`. Set `status: clear` for a checkmark
or `status: nap` for an X. Leave the status out until that day is recorded.
The tracker uses TRMNL's render timestamp to remind you to fill in previous
days.

## easy input webapp

Open [tracker.html](./tracker.html) directly in a browser. Click each day to
cycle through empty, no nap (`✓`), and napped (`×`). The statuses are saved
locally in the browser with `localStorage`; no Wi-Fi, server, or account is
needed. Use **Reset month** to clear the local entries.

The physical TRMNL display is read-only and still needs a network connection
to receive updated plugin data. The offline tracker is therefore a local
companion for recording statuses, not a way to update the device itself.

## setup

1. Install `trmnlp`
2. Update the November statuses as the month progresses.
3. Create a Private Plugin in TRMNL and copy the markup into it,
   or use the CLI workflow for publishing a plugin.
