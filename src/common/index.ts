
export class apiResponse {
    private status: number | null
    private message: string | null
    private data: any | null
    private error: any | null
    constructor(status: number, message: string, data: any, error: any) {
        this.status = status
        this.message = message
        this.data = data
        this.error = error
    }
}

export const userStatus = {
    user: "user",
    admin: "admin",
    upload: "upload"
}

export const COURSE_DISCOUNT = {
    PERCENTAGE: "percentage",
    FIXED: "fixed"
}

export const BANNER ={
    HERO:"hero",
    WORKSHOP:"workshop"
}

export const COUPON_DISCOUNT = {
    PERCENTAGE: "percentage",
    PRICE: "price"
}