'use client'
import ImageSelector from '@/components/v2/ImageSelector';
import { complaintSchema } from '@/validations/compaint-ticket';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronDown } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

const ISSUE = [
    { value: "wrong item received", label: "Wrong item received" },
    { value: "item damaged", label: "Item damaged" },
    { value: "item not working ", label: "Item not working" },
    { value: "late delivery", label: "Late delivery" },
    { value: "warranty problem", label: "Warranty problem" },
    { value: "other", label: "other" },
];

const btnGold =
    "inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-primary px-5 py-[15px] font-heading text-[15px] font-bold text-white transition hover:bg-primary-200 disabled:cursor-not-allowed disabled:opacity-60";
const errText = "mt-1.5 text-xs text-red-600";
const label = "mb-2 block font-heading text-[13px] font-semibold text-ink-2";


const ComplaintForm = ({ orders, onSubmit, isSaving }) => {
    const WHICH_ORDER = [
        ...orders,
    { value: "null", label: "Not about a specific order" },
]

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(complaintSchema),
        defaultValues: {
            orderId: '',
            complaintType: '',
            describe: '',
            image: [],
        },
    });
    
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 md:p-6 rounded-2xl drop-shadow-lg"
        >
            <div className="grid grid-cols-1 gap-x-2">
                {/* Which order? */}
                <div>
                    <label className={`${label} mt-4`}>Which order?</label>
                    <Controller
                        name="orderId"
                        control={control}
                        render={({ field }) => (
                            <div className="relative w-full">
                                <select
                                    {...field}
                                    // autoComplete="off"
                                    disabled={isSaving}
                                    className="appearance-none input border rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
                                >
                                    <option value="">Select order if any issue</option>
                                    {WHICH_ORDER.map((order) => (
                                        <option key={order.value} value={order.value}>
                                            {order.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>
                        )}
                    />
                    {errors.orderId && (
                        <p className={errText}>{errors.orderId.message}</p>
                    )}
                </div>
                {/* What is the issue? */}
                <div>
                    <label className={`${label} mt-4`}>What is the issue?</label>
                    <Controller
                        name="complaintType"
                        control={control}
                        render={({ field }) => (
                            <div className="relative w-full">
                                <select
                                    {...field}
                                    // autoComplete="off"
                                    disabled={isSaving}
                                    className="appearance-none input border rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
                                >
                                    <option value="">Select an issue</option>
                                    {ISSUE.map((issue) => (
                                        <option key={issue.value} value={issue.value}>
                                            {issue.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>
                        )}
                    />
                    {errors.complaintType && (
                        <p className={errText}>{errors.complaintType.message}</p>
                    )}
                </div>
                <div>
                    <label className={`${label} mt-4`}>Describe it</label>
                    <textarea
                        {...register("describe")}
                        // autoComplete="off"
                        placeholder="Tell us what happened, with as much detail as you can."
                        disabled={isSaving}
                        className="input border-2 rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
                        rows={4}
                    />
                    {errors.describe && (
                        <p className={errText}>{errors.describe.message}</p>
                    )}
                </div>
                {/* Attach Photos */}
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                        <ImageSelector
                            value={field.value ?? []}
                            onChange={field.onChange}
                            disabled={isSaving}
                        />
                    )}
                />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="submit" disabled={isSaving} className={btnGold}>
                    {isSaving ? "Please Wait..." : "Submit complaint"}
                </button>
            </div>
        </form>

    )
}

export default ComplaintForm