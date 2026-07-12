import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAssets from '../hooks/useAssets';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/common/SearchBar';
import AssetFilter from '../components/asset/AssetFilter';
import AssetTable from '../components/asset/AssetTable';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';

const Assets = () => {
  const navigate = useNavigate();
  const { assets, loading, error, fetchAssets } = useAssets();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetchAssets({
      search: debouncedSearch,
      category,
      status,
    });
  }, [debouncedSearch, category, status, fetchAssets]);

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setStatus('');
  };

  const categories = Array.from(new Set(assets.map((a) => a.category).filter(Boolean)));
  const statuses = Array.from(new Set(assets.map((a) => a.status).filter(Boolean)));

  const columns = [
    { header: 'Tag', accessor: 'tag' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status' },
    { header: 'Location', accessor: 'location' },
  ];

  return (
    <div className="assets-pagecontainer container">
      <div className="flex justify-between items-center mb-6">
        <h1>Assets Inventory</h1>
        <Button onClick={() => navigate('/assets/add')} className="btn-primary">
          Add Asset
        </Button>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search assets..." />
        <AssetFilter
          search={search}
          category={category}
          status={status}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onReset={handleReset}
          categories={categories}
          statuses={statuses}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <Loader text="Loading assets..." />
      ) : assets.length === 0 ? (
        <EmptyState
          message="No assets found"
          description="Try adjusting your filters or add a new asset to get started."
        />
      ) : (
        <AssetTable
          data={assets}
          columns={columns}
          onRowClick={(asset) => navigate(`/assets/${asset.id}`)}
        />
      )}
    </div>
  );
};

export default Assets;
