import { useWriteContract, useReadContract } from 'wagmi';
import { CipherCollaborateAI_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

export const useCreateDataset = () => {
  const { writeContract, isPending, error } = useWriteContract();

  const createDataset = async (args: {
    args: [string, string, string, any, any, any];
  }) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CipherCollaborateAI_ABI,
      functionName: 'createDataset',
      args: args.args,
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

  const contributeToDataset = async (args: {
    args: [number, any, any, string, any];
  }) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CipherCollaborateAI_ABI,
      functionName: 'contributeToDataset',
      args: args.args,
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

  const startTrainingSession = async (args: {
    args: [number, string];
  }) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CipherCollaborateAI_ABI,
      functionName: 'startTrainingSession',
      args: args.args,
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

  const completeTrainingSession = async (args: {
    args: [number, any, any, any];
  }) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CipherCollaborateAI_ABI,
      functionName: 'completeTrainingSession',
      args: args.args,
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
    address: CONTRACT_ADDRESS,
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
    address: CONTRACT_ADDRESS,
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
