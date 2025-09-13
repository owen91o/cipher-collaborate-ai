import { useWriteContract, useReadContract } from 'wagmi';
import { CipherCollaborateAI_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

export const useCreateDataset = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const createDataset = async (args: [string, string, string, `0x${string}`, `0x${string}`, `0x${string}`]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CipherCollaborateAI_ABI,
      functionName: 'createDataset',
      args,
    });
  };

  return {
    createDataset,
    isLoading: isPending,
    error,
  };
};

export const useContributeToDataset = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const contributeToDataset = async (args: [bigint, `0x${string}`, `0x${string}`, string, `0x${string}`]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CipherCollaborateAI_ABI,
      functionName: 'contributeToDataset',
      args,
    });
  };

  return {
    contributeToDataset,
    isLoading: isPending,
    error,
  };
};

export const useStartTrainingSession = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const startTrainingSession = async (args: [bigint, string]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CipherCollaborateAI_ABI,
      functionName: 'startTrainingSession',
      args,
    });
  };

  return {
    startTrainingSession,
    isLoading: isPending,
    error,
  };
};

export const useCompleteTrainingSession = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const completeTrainingSession = async (args: [bigint, `0x${string}`, `0x${string}`, `0x${string}`]) => {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CipherCollaborateAI_ABI,
      functionName: 'completeTrainingSession',
      args,
    });
  };

  return {
    completeTrainingSession,
    isLoading: isPending,
    error,
  };
};

export const useGetDatasetInfo = (datasetId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherCollaborateAI_ABI,
    functionName: 'getDatasetInfo',
    args: [BigInt(datasetId)],
  });

  return {
    datasetInfo: data,
    isLoading,
    error,
  };
};

export const useGetContributorReputation = (address: string) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherCollaborateAI_ABI,
    functionName: 'getContributorReputation',
    args: [address as `0x${string}`],
  });

  return {
    reputation: data,
    isLoading,
    error,
  };
};