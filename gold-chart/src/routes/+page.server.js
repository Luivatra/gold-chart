export async function load() {
    const history_data = await (await fetch("https://api.cruxfinance.io/crux/gold_oracle_history")).json();
    return {
        history: history_data
    };
} 