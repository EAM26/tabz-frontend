import { useEffect, useState } from "react";
import api from "../services/api.js";
import formatToStandard from "../utils/DateTimeFormatter.js";

function UserPage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [openActionTabId, setOpenActionTabId] = useState(null);
    const [downloadError, setDownloadError] = useState("");

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await api.get("/api/user/me");
                setUserData(response.data);
            } catch (error) {
                setError("Something went wrong while loading your overview.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    const tabs = userData?.tabs ?? [];

    const totalAmount = tabs.reduce((total, tab) => {
        return total + Number(tab.totalAmount ?? 0);
    }, 0);

    function formatAmount(amount) {
        return new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    }

    async function downloadTab(tabId) {
        setDownloadError("");

        try {
            const response = await api.get(`/api/tab/${tabId}/download`, {
                responseType: "blob",
            });

            const file = new Blob([response.data], {
                type: "application/pdf",
            });

            const fileUrl = window.URL.createObjectURL(file);
            const link = document.createElement("a");

            link.href = fileUrl;
            link.download = `tab-${tabId}.pdf`;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(fileUrl);

            setOpenActionTabId(null);
        } catch (error) {
            console.error(error);

            if (error.response?.status === 403) {
                setDownloadError("You are not allowed to download this tab.");
                return;
            }

            if (error.response?.status === 404) {
                setDownloadError("This tab file could not be found.");
                return;
            }

            setDownloadError("Something went wrong while downloading the tab.");
        }
    }

    if (isLoading) {
        return (
            <section className="bg-tabz-background px-6 py-10 font-poppins text-tabz-text md:py-16">
                <div className="mx-auto max-w-6xl">
                    <p className="text-tabz-muted">Loading your overview...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-tabz-background px-6 py-10 font-poppins text-tabz-text md:py-16">
                <div className="mx-auto max-w-6xl">
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-tabz-background px-6 py-10 font-poppins text-tabz-text md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                                Hello {userData.username}!
                            </h1>

                            <img
                                className="h-9 w-9"
                                src="/clapping.svg"
                                alt="Clapping hands"
                            />
                        </div>

                        <p className="mt-3 text-lg text-tabz-muted md:text-xl">
                            This is your overview.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-tabz-soft px-5 py-4 text-sm text-tabz-muted ring-1 ring-tabz-border">
                        <span className="font-semibold text-tabz-dark">
                            {tabs.length}
                        </span>{" "}
                        active tabs
                    </div>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
                    <section className="rounded-3xl bg-tabz-surface p-6 shadow-[0_18px_45px_rgba(21,71,44,0.10)] ring-1 ring-tabz-border">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tabz-soft">
                                <img
                                    className="h-6 w-6"
                                    src="/user-gr.svg"
                                    alt="User icon"
                                />
                            </div>

                            <h2 className="text-2xl font-bold">
                                Your details
                            </h2>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div>
                                <p className="text-sm font-semibold text-tabz-muted">
                                    Username
                                </p>
                                <p className="mt-1 text-lg font-semibold text-tabz-text">
                                    {userData.username}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-tabz-muted">
                                    E-mail address
                                </p>
                                <p className="mt-1 break-words text-lg font-semibold text-tabz-text">
                                    {userData.email}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-tabz-soft p-5">
                                <p className="text-sm font-semibold text-tabz-muted">
                                    Total amount
                                </p>
                                <p className="mt-1 text-3xl font-bold text-tabz-dark">
                                    {formatAmount(totalAmount)}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl bg-tabz-surface p-6 shadow-[0_18px_45px_rgba(21,71,44,0.10)] ring-1 ring-tabz-border">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tabz-soft">
                                    <img
                                        className="h-6 w-6"
                                        src="/chart.svg"
                                        alt="Chart icon"
                                    />
                                </div>

                                <h2 className="text-2xl font-bold">
                                    Your tabs
                                </h2>
                            </div>

                            <p className="hidden text-sm font-medium text-tabz-muted sm:block">
                                Latest claimed tabs
                            </p>
                        </div>

                        {downloadError && (
                            <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {downloadError}
                            </p>
                        )}

                        <div className="mt-8 overflow-hidden rounded-2xl border border-tabz-border">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[620px] border-collapse text-left">
                                    <thead className="bg-tabz-soft">
                                    <tr>
                                        <th className="px-5 py-4 text-sm font-bold text-tabz-dark">
                                            Shop
                                        </th>
                                        <th className="px-5 py-4 text-sm font-bold text-tabz-dark">
                                            Amount
                                        </th>
                                        <th className="px-5 py-4 text-sm font-bold text-tabz-dark">
                                            Date
                                        </th>
                                        <th className="px-5 py-4 text-right text-sm font-bold text-tabz-dark">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-tabz-border bg-white">
                                    {tabs.length > 0 ? (
                                        tabs.map((tab) => (
                                            <tr
                                                className="transition-colors hover:bg-tabz-background"
                                                key={tab.id}
                                            >
                                                <td className="px-5 py-4 text-sm font-semibold text-tabz-text">
                                                    {tab.shopName}
                                                </td>

                                                <td className="px-5 py-4 text-sm font-medium text-tabz-text">
                                                    {formatAmount(tab.totalAmount)}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-tabz-muted">
                                                    {formatToStandard(tab.createdAt)}
                                                </td>

                                                <td className="px-5 py-4 align-top">
                                                    <div className="flex flex-col items-end gap-2">
                                                        <button
                                                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-tabz-soft"
                                                            type="button"
                                                            aria-label="Open tab actions"
                                                            onClick={() =>
                                                                setOpenActionTabId(openActionTabId === tab.id ? null : tab.id)
                                                            }
                                                        >
                                                            <img
                                                                className="h-5 w-5"
                                                                src="/dots-vert.svg"
                                                                alt=""
                                                            />
                                                        </button>

                                                        {openActionTabId === tab.id && (
                                                            <button
                                                                className="rounded-xl border border-tabz-border bg-white px-4 py-2 text-sm font-semibold text-tabz-dark shadow-sm hover:bg-tabz-soft"
                                                                type="button"
                                                                onClick={() => downloadTab(tab.id)}
                                                            >
                                                                Download Tab
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="px-5 py-8 text-center text-sm text-tabz-muted"
                                                colSpan="4"
                                            >
                                                No tabs found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default UserPage;