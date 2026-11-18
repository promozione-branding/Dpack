
export async function sendOrderToSalesmax(order) {
    const endpoint = process.env.SALESMAX_LEAD_API_URL;

    if (!endpoint) {
        console.error("Salesmax API URL is missing");
        return { success: false, error: "Missing configuration" };
    }

    const phone = String(order.customerMobile || "")
        .replace(/\D/g, "")
        .replace(/^0+/, "");

    const mobile =
        phone.length === 10 ? `+91${phone}` :
            phone.length === 12 && phone.startsWith("91")
                ? `+${phone}`
                : null;

    if (!mobile) {
        console.error("Salesmax: Invalid customer mobile");
        return { success: false, error: "Invalid mobile" };
    }

    const orderId = String(order._id);

    const productNames = order.items
        .map((item) => item.name)
        .join(", ");

    const totalQuantity = order.items.reduce(
        (sum, item) => sum + Number(item.qty || 0),
        0
    );

    const payload = {
        "Customer Name": order.customerName || "Customer",
        "Mobile no": mobile,
        "Lead Source": "Dpack Shop",
        "Order ID": orderId,
        "Product": productNames,
        "Quantity": String(totalQuantity),
        "Total Amount": String(order.total),
        "Payment Method":
            order.paymentMethod === "razorpay"
                ? "Online Payment"
                : order.paymentMethod === "cod"
                    ? "COD"
                    : order.paymentMethod || "Online Payment",
        "Tracking URL":
            `https://dpackshop.com/order/${encodeURIComponent(orderId)}`,
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(8000),
            cache: "no-store",
        });

        const result = await response.text();

        if (!response.ok) {
            console.error("Salesmax API failed:", response.status, result);
            return { success: false, status: response.status };
        }

        console.log("Salesmax lead accepted:", response.status);

        return { success: true, status: response.status };
    } catch (error) {
        console.error("Salesmax API error:", error);
        return { success: false, error: error.message };
    }
}
