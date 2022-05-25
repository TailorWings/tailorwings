export class Feedback {
    rating!: number;
    comment?: string;
}
export class Customer {
    name!: string;
    address!: string;
    profileImageUrl?: string;
    feedback!: Feedback
}