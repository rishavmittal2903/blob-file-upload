import { BlobServiceClient} from '@azure/storage-blob';
import { blobClientUrl, blobServiceUrl, containerName, sasToken, storageAccountName } from '../../constants/ApiEndpoint';

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !((!storageAccountName || !sasToken));
};

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient:any) => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      blobClientUrl(blob.name)
    );
  }

  return returnedBlobUrls;
};


const createBlobInContainer = async (containerClient:any, file:any) => {
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
  await blobClient.setMetadata({UserName : 'developer'});
};

const uploadFileToBlob = async (file:any) => {
  if (!file) return [];

  const blobService = new BlobServiceClient(
    blobServiceUrl
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

  // upload file
  for(let item of file)
  {
  await createBlobInContainer(containerClient, item);
  }

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};

export default uploadFileToBlob;

