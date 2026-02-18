import { Loader } from '@mantine/core';

export default function FullscreenLoader() {
  return <div className="fullscreen-loader">
    <Loader color='#2563eb' size={48}  />
    <h1>Fetching Data</h1>
  </div>;
}