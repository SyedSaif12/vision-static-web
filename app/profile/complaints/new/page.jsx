'use client'
import React, { useEffect, useState } from 'react'
import ComplaintForm from '../_components/ComplaintForm'
import { useDispatch, useSelector } from 'react-redux'
import { overviewAction } from '@/redux/profile/overview/overviewSlice';
import PageLoader from '@/components/v2/loader';
import Link from 'next/link';
import { MoveLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { createTicketAction } from '@/redux/profile/complaint/complaintSlice';
import { useRouter } from 'next/navigation';

const EMPTY_ORDERS = [];

const page = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { data, isLoading } = useSelector((state) => state.overview);
    const [isSaving, setIsSaving] = useState(false)

    const orders = Array.isArray(data) ? data?.map((order) => ({
        value: order.id,
        label: `Order #WG-${new Date().getFullYear()}-${order.id.slice(-6).toUpperCase()}`
    })) : EMPTY_ORDERS;

    useEffect(() => {
        if (!!orders.length) return
        dispatch(overviewAction());
    }, [dispatch]);

    async function onSubmit(payload) {
        setIsSaving(true)
        try {
            if (payload.orderId == 'null') {
                delete payload.orderId
            }
            await dispatch(createTicketAction({ payload, router })).unwrap();
        } catch (error) {
            toast.error(
                error?.data?.message ||
                error?.message ||
                "Could not save profile. Please try again.",
            );
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading && !orders.length) {
        return (
            <div>
                <PageLoader />
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-surface py-4 sm:py-6 md:py-8 font-sans text-ink relative">
            <Link className='text-muted flex gap-1 items-center mb-2' href={`/profile/complaints`}><MoveLeftIcon size={20} /> Back to complaints</Link>
            <h1 className="mb-2 text-section-title tracking-normal font-bold">
                File a complaint
            </h1>
            <p className="mb-6 text-body text-muted">Tell us what went wrong. We reply on WhatsApp and in the ticket.</p>
            <ComplaintForm orders={orders} onSubmit={onSubmit} isSaving={isSaving} />
        </section>
    )
}

export default page