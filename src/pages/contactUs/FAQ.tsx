import React from 'react'

const FAQ = () => {
    return (
        <div className="flex flex-col gap-4 font-normal text-sm">
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="font-semibold">To cancel your order:</div>
                <div className="flex flex-col">
                    <div>
                        1. Go to Orders & Returns if you have an account, or if you
                        placed an order as a guest, enter your guest order details here
                        – you'll need to provide your order number and email address.
                    </div>
                    <div>
                        2. Select the items you want to cancel and your reason for
                        cancellation
                    </div>
                    <div>3. We'll email you confirmation of your cancelled order</div>
                </div>
                <div>
                    If your order has already been prepared, we can't cancel your
                    order — but we do offer a free returns service.
                </div>
            </div>
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="font-semibold">
                    Here’s what you need to do to book your return:
                </div>
                <div className="flex flex-col">
                    <div>
                        1. Go to Orders & Returns if you have an account. If you placed
                        your order as a guest, enter your guest order details here.
                    </div>
                    <div>
                        2. Find the order you want to return and click Return Item(s).
                    </div>
                    <div>3. Select each item and your reason for returning.</div>
                </div>
            </div>
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="font-semibold">
                    There are two ways to return your items. Depending on your
                    location, one will always be available.
                </div>
                <div className="flex flex-col">
                    <div>
                        <div>1. Book a free returns collection</div>
                        <div>
                            Select your collection address and number of packages,
                            schedule a collection date, suitable time and click Book
                            Collection.
                        </div>
                    </div>
                    <div>
                        <div>2. Return for free at a drop-off point near you</div>
                        <div>
                            Select the in-store or drop-off option in your account and
                            take the return to your chosen FARFETCH partner boutique or
                            courier drop-off point.
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 tracking-wider">
                <div className="font-semibold">Prepare your return:</div>
                <div className="flex flex-col">
                    <div>
                        1. Place the item inside the Groyyo Studio packaging – don't
                        forget any brand boxes, dust bags, or cases.
                    </div>
                    <div>
                        2. Attach your Return Label to the outside of the Groyo Studio
                        packaging.
                    </div>
                    <div>
                        3. If you received a Return Note with your order, attach it to
                        the outside of your package.
                    </div>
                    <div>
                        4. Give the Waybill Doc to the courier. Make a note of the
                        Waybill Number to track your return.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ