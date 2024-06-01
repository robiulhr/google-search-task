
export default async function autoScroll(page) {
    let currentReqCount = 0;

    const reqListener = (request) => {
        currentReqCount += 1;
    };
    page.on('request', reqListener);

    await page.evaluate(async (currentReqCount) => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let prevReqCount = currentReqCount;
            let isFirstAttempt = true;

            let timer = setInterval(() => {
                isFirstAttempt && (isFirstAttempt = !isFirstAttempt);
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight - window.innerHeight && prevReqCount === currentReqCount) {
                    clearInterval(timer);
                    resolve();
                } else {
                    prevReqCount = currentReqCount;
                }
            }, 300);
        });
    }, currentReqCount);

    // Remove the request listener after scrolling is done
    page.off('request', reqListener);
}
