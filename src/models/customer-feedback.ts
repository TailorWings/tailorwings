export class Feedback {
    rating!: number;
    comment?: string;
}
export class CustomerFeedback {
    name!: string;
    address!: string;
    job?: string;
    profileImageUrl?: string;
    productImageUrl?: string;
    feedback!: Feedback
}