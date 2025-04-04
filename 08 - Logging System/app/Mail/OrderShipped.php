<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public string $price = "58")
    {
        //
        
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        

        return new Envelope(            
            subject: 'Order Shipped',
            from: new Address("admin@profilelinkservices.com", "Tabish Sajwani"),
            replyTo: [
                new Address("tabishsajwani@gmail.com", "Tabish Sajwani")
            ]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $orderName = "Toy";

        return new Content(
            view: 'emails.content',
            with: [ 
                "orderName" => $orderName,
                "orderPrice" => $this->price
             ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
