import { type Subscription, type Consumer, createConsumer } from "@rails/actioncable"
import { useEffect, useRef } from "react"
import { isEqual } from "lodash-es"

// Global config
export let cableConfig = {
  url: String(import.meta.env.VITE_CABLE_URL ?? "/cable")
}

// Singleton consumer with SSR guard
let singletonConsumer: Consumer | null = null

export function getConsumer(): Consumer | null {
  if (typeof window === "undefined") return null
  if (singletonConsumer) return singletonConsumer
  if (!cableConfig) {
    console.warn("Cable not configured. Call configureCable() first.")
    return null
  }
  singletonConsumer = createConsumer(cableConfig.url)
  return singletonConsumer
}

export function teardownCable(): void {
  if (singletonConsumer) {
    singletonConsumer.disconnect()
    singletonConsumer = null
  }
}

interface ChannelOptions<TActions extends string = string> {
  props?: object
  actions?: TActions[]
  enabled?: boolean
}

interface CableHookReturn {
  leave: () => void
  send: (data: object) => void
  perform: (action: string, data?: object) => void
}

export const useCable = <TEvent = object, TActions extends string = string>(
  channelName: string,
  options: ChannelOptions<TActions>,
  callback: (event: TEvent) => void,
): CableHookReturn => {
  const subscriptionRef = useRef<Subscription | null>(null)
  const propsRef = useRef(options.props)
  const callbackRef = useRef(callback)

  callbackRef.current = callback

  if (!isEqual(propsRef.current, options.props)) {
    propsRef.current = options.props
  }

  const consumer = getConsumer()
  const enabled = options.enabled ?? true

  useEffect(() => {
    if (!consumer || !enabled) {
      subscriptionRef.current?.unsubscribe()
      subscriptionRef.current = null
      return
    }
    subscriptionRef.current = consumer.subscriptions.create(
      {
        channel: channelName,
        ...propsRef.current,
      },
      {
        received: (data: TEvent) => {
          callbackRef.current(data)
        },
      },
    )
    return () => {
      subscriptionRef.current?.unsubscribe()
      subscriptionRef.current = null
    }
  }, [channelName, propsRef.current, consumer, enabled])

  const leave = (): void => {
    subscriptionRef.current?.unsubscribe()
    subscriptionRef.current = null
  }

  const send = (data: object): void => {
    subscriptionRef.current?.send(data)
  }

  const perform = (action: string, data?: object): void => {
    subscriptionRef.current?.perform(action, data)
  }

  return { leave, send, perform }
}