const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!cloudName || !uploadPreset) {
    throw new Error('Missing Cloudinary env vars: VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload cover gagal: ${text}`);
  }

  const data = (await response.json()) as { secure_url?: string };
  if (!data.secure_url) throw new Error('Upload cover gagal: secure_url tidak tersedia');
  return data.secure_url;
}
