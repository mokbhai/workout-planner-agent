import {
  getConnectionStatus,
  type Device,
  devices,
} from "@/components/data/devices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRedisCache, setRedisCache } from "@/utils/redis";

interface DeviceIntegration {
  enabled: boolean;
  devices: Array<{ id: string; enabled: boolean }>;
  timestamp: string;
}

export default async function Devices({ userId }: { userId: string }) {
  const deviceStatus: any[] = [];
  let integrations = await getRedisCache(`feature_flag:device_integrations`);
  if (!integrations) {
    integrations = JSON.stringify({
      enabled: true,
      devices: devices.map((device) => ({ id: device.id, enabled: true })),
      timestamp: new Date().toISOString(),
    });
    await setRedisCache(`feature_flag:device_integrations`, integrations);
  }

  const parsedIntegrations: DeviceIntegration = JSON.parse(integrations);
  if (!parsedIntegrations.enabled) {
    return null;
  }
  
  for (const device of devices) {
    const data = await getConnectionStatus(device, userId);
    deviceStatus.push({ ...data, device });
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Connected Devices & Platforms
      </h3>
      <p className="text-gray-600 mb-4">
        Connect your fitness devices and platforms to get personalized workout
        recommendations based on your activity data.
      </p>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deviceStatus.map(({ device, ...data }) => {
            const isEnabled = parsedIntegrations?.devices?.find(
              (d) => d.id === device.id
            )?.enabled;

            if (!isEnabled) return null;

            return (
              <div
                key={device.id}
                className="bg-white text-black text-center rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="font-semibold text-lg mb-3">{device?.name}</div>
                {data.connected ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      {data.userData?.profile && (
                        <Avatar>
                          <AvatarImage src={data.userData.profile} />
                          <AvatarFallback>
                            {data.userData.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h3 className="font-medium">{data.userData?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {data.userData?.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Connected</span>
                      <a
                        href={data.disconnectUrl}
                        className="text-red-600 hover:text-red-800"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {device.buttonImage ? (
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={device.buttonImage}
                          alt={device.name}
                          className={
                            device.id === "strava" ? "h-12 mx-auto" : "w-full"
                          }
                        />
                      </a>
                    ) : (
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Connect Device
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
