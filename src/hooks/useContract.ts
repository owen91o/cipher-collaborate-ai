import { useContract, useContractWrite, useContractRead } from 'wagmi';
import { CipherCollaborateAI_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

export const useCipherContract = () => {
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
  });

  return contract;
};

export const useCreateDataset = () => {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
    functionName: 'createDataset',
  });

  return {
    createDataset: write,
    isLoading,
    error,
  };
};

export const useContributeToDataset = () => {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
    functionName: 'contributeToDataset',
  });

  return {
    contributeToDataset: write,
    isLoading,
    error,
  };
};

export const useStartTrainingSession = () => {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
    functionName: 'startTrainingSession',
  });

  return {
    startTrainingSession: write,
    isLoading,
    error,
  };
};

export const useCompleteTrainingSession = () => {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
    functionName: 'completeTrainingSession',
  });

  return {
    completeTrainingSession: write,
    isLoading,
    error,
  };
};

export const useGetDatasetInfo = (datasetId: number) => {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
    functionName: 'getDatasetInfo',
    args: [datasetId],
  });

  return {
    datasetInfo: data,
    isLoading,
    error,
  };
};

export const useGetContributorReputation = (address: string) => {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CipherCollaborateAI_ABI,
    functionName: 'getContributorReputation',
    args: [address],
  });

  return {
    reputation: data,
    isLoading,
    error,
  };
};