import { FC, useEffect } from 'react';
import { RootState } from '../../redux/store';
import { Col, Divider, Row, Layout } from "antd";

import { updatePagination, fetchOrder, resetData, updateSort, updateFilter } from '../../components/User/OrderTable/reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { openOrderModalEdit } from '../../components/User/OrderModal/reducer';
import { Order } from '../../types/User';

import BreadCrumb from '../../sharedComponents/BreadCrumb';
import Pagination from '../../sharedComponents/Pagination';
import OrderTable from '../../components/User/OrderTable';
import OrderModal from '../../components/User/OrderModal';

const UserContainer: FC = () => {
	const dispatch = useAppDispatch();

	const { data, loading, pagination, sort, filter } = useAppSelector((state: RootState) => state.orderPage.orderReducer);
	const { isShow } = useAppSelector((state: RootState) => state.orderPage.orderModalReducer);
	const { page, pageSize, totalItem } = pagination;

	const onChangePage = (page: number) => {
		dispatch(updatePagination({ ...pagination, page }));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(updatePagination({ ...pagination, page: 0, pageSize }));
	};

	const onOpenOrderModal = (isEdit: boolean, data: Order) => {
		dispatch(openOrderModalEdit({ isEdit, data }));
	};

	const onUpdateSort = (value: any) => {
		dispatch(updateSort(value));
	};

	const onUpdateFilter = (value: any) => {
		dispatch(updateFilter(value));
	};

	useEffect(() => {
		return () => {
			dispatch(resetData());
		};
	}, []);

	useEffect(() => {
		dispatch(fetchOrder({ sort, filter, page, pageSize }));
	}, [sort, filter, page]);

	return (
		<Layout className='container--main'>

			<Row className='container__user'>

				<Col span={24}>
					<BreadCrumb path='User' subPath='Order'></BreadCrumb>

					<Divider />

					<OrderTable
						sort={sort}
						filter={filter}
						onUpdateSort={onUpdateSort}
						data={data}
						loading={loading}
						onOpenOrderModal={onOpenOrderModal}
						onUpdateFilter={onUpdateFilter}
					></OrderTable>

					<Divider />

					<Pagination
						loading={loading}
						page={page}
						pageSize={pageSize}
						totalItem={totalItem}
						onChangePage={onChangePage}
						onChangePageSize={onChangePageSize}
					/>

				</Col>
			</Row>
			{isShow && (<OrderModal></OrderModal>)}

		</Layout>
	);
};

export default UserContainer;
