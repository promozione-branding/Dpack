const API_URL = "https://bhashsms.com/api/sendmsgutil.php";

/**
 * Send WhatsApp message using BhashSMS
 */
export async function sendBhashWhatsApp({
    phone,
    template,
    params = [],
}) {
    const mobile = String(phone || "").replace(/\D/g, "");

    const normalizedPhone =
        mobile.length === 12 && mobile.startsWith("91")
            ? mobile.slice(2)
            : mobile;

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
        return {
            success: false,
            error: "Invalid Indian mobile number",
        };
    }

    if (
        !process.env.BHASH_USER ||
        !process.env.BHASH_PASSWORD ||
        !template
    ) {
        return {
            success: false,
            error: "BhashSMS configuration missing",
        };
    }

    const url = new URL(API_URL);

    url.searchParams.set("user", process.env.BHASH_USER);
    url.searchParams.set("pass", process.env.BHASH_PASSWORD);
    url.searchParams.set(
        "sender",
        process.env.BHASH_SENDER || "BUZWAP"
    );

    url.searchParams.set("phone", normalizedPhone);
    url.searchParams.set("text", template);
    url.searchParams.set("priority", "wa");
    url.searchParams.set("stype", "normal");

    if (params.length) {
        url.searchParams.set(
            "Params",
            params.map(String).join(",")
        );
    }

    try {
        const response = await fetch(url.toString(), {
            method: "GET",
            cache: "no-store",
            signal: AbortSignal.timeout(10000),
        });

        const result = await response.text();

        const rejected =
            !response.ok ||
            /incorrect|invalid|deactivated|failed|error/i.test(result);

        if (rejected) {
            console.error("BhashSMS request rejected", {
                status: response.status,
                result,
            });

            return {
                success: false,
                response: result,
            };
        }

        return {
            success: true,
            response: result,
        };
    } catch (error) {
        console.error("BhashSMS error:", error.message);

        return {
            success: false,
            error: error.message,
        };
    }
}

/**
 * Send Dpack Shop order confirmation
 * after successful Razorpay payment
 */
export async function sendOrderWhatsApp(order) {
    if (!order) {
        return {
            success: false,
            error: "Order data missing",
        };
    }

    if (order.paymentStatus !== "paid") {
        return {
            success: false,
            error: "Order payment is not confirmed",
        };
    }

    const quantity = (order.items || []).reduce(
        (sum, item) => sum + Number(item.qty || 0),
        0
    );

    const params = [
        String(order.customerName || "Customer"),
        String(order._id),
        String(quantity),
        String(order.total ?? 0),
    ];

    return sendBhashWhatsApp({
        phone: order.customerMobile,
        template: process.env.BHASH_TEMPLATE,
        params,
    });
}