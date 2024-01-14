await Bun.build({
	entrypoints: ["./main.ts"],
	outdir: "./dist/lib",
	target: "browser",
});
