<script>
    export let data;
    import { Chart, TimeScale } from "chart.js/auto";
    import "chartjs-adapter-spacetime";
    import zoomPlugin from "chartjs-plugin-zoom";

    Chart.register(zoomPlugin);

    Chart.register(TimeScale);
    import { onMount } from "svelte";

    let ctx;
    let chartCanvas;

    onMount(async (promise) => {
        ctx = chartCanvas.getContext("2d");
        var chart = new Chart(ctx, {
            type: "line",

            options: {
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: "x",
                        },
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            enabled: true,
                            mode: "x",
                        },
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                        },
                    },
                    yErgPerGold: {
                        position: "left",
                    },
                    yUsdPerErg: {
                        position: "right",
                    },
                },
                pointRadius: 0,
                tension: 0,
            },
            data: {
                labels: data.history.map((h) => h.timestamp * 1000),
                datasets: [
                    {
                        label: "Erg per 1g of gold",
                        backgroundColor: "gold",
                        borderColor: "gold",
                        data: data.history.map((h) => h.erg_per_gold_1g),
                        yAxisID: "yErgPerGold",
                    },
                    {
                        label: "USD per erg",
                        backgroundColor: "orange",
                        borderColor: "orange",
                        data: data.history.map((h) => h.usd_per_erg),
                        yAxisID: "yUsdPerErg",
                    },
                ],
            },
        });
    });
</script>

<div class="chart-container">
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
</div>

<style>
    .chart-container {
        position: relative;
        margin: auto;
        height: 80vh;
        width: 80vw;
        background-color: rgb(40, 45, 50);
    }
</style>
