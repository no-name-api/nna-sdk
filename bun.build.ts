await Bun.build({
	entrypoints: ["./main.ts"],
	outdir: "./core",
	target: "node",
});
