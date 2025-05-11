import { getLedStatus, getLightData } from "@/api/adafruit"
import { useClientMqtt } from "@/provider/MqttProvider"
import { useCallback, useEffect, useState } from "react"
import { FEED_LED_CONTROL, FEED_LIGHT } from "@/common/constant"

export default function useLed() { 
    const client = useClientMqtt()

    const [ledStatus, setLedStatus] = useState('N/A')
    const [lightData, setLightData] = useState('N/A')

    const initData = async () => {
        try {
            if(ledStatus === 'N/A'){
                const ledStatus = await getLedStatus()
                setLedStatus(ledStatus)
            }
            if(lightData === 'N/A'){
                const lightData = await getLightData()
                setLightData(lightData)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        initData()
    }, [])

    const handleSetLedStatus = useCallback((data: '0' | '1') => {
        if (client) {
            console.log(`🚰 Điều khiển đèn Led: ${data}`);
            client.publish(FEED_LED_CONTROL, data, { qos: 0, retain: false });
            setLedStatus(data)
        }
    },[client])

    useEffect(() => {
        if (!client) return;
        
	    // SUBCRIBE FEED TO LISTEN
        client.on('connect', () => {
           
            client.subscribe(FEED_LED_CONTROL);
            client.subscribe(FEED_LIGHT);
        });

        // LISTEN MESSAGE
        client.on('message', (topic, message) => {
            const data = message.toString();
            // console.log(`📡 Nhận MQTT: ${topic} -> ${data}`);
            if (topic === FEED_LED_CONTROL) {
                setLedStatus(data)
            } else if (topic === FEED_LIGHT) {
                setLightData(data)
            }
        })


    
    },[client])
    
    
    return {ledStatus, lightData, handleSetLedStatus, client}

}
