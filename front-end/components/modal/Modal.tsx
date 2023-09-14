'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { Box } from '@mui/material'

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    return (
        // <div
        //     ref={overlay}
        //     className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
        //     onClick={onClick}
        // >
        //     <div
        //         ref={wrapper}
        //         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
        //     >
        //         {children}
        //     </div>
        // </div>
        <Box
            ref={overlay}
            sx={{ left: 0, top: 0, bottom: 0, backgroundColor: "rgb(241,245,249,20%)", marginX: "auto", position: "fixed", width: "100%", height: "100%" }}
            onClick={onClick}
        >
            <Box ref={wrapper} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                {children}
            </Box>
        </Box>
    )
}