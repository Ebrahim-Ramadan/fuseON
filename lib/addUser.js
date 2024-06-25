import { useMutation } from '@tanstack/react-query';

const postData = async (data) => {
  const response = await fetch('https://your-api-endpoint.com/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

const usePostData = () => {
  return useMutation(postData);
};

export default usePostData;
