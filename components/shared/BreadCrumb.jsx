"use client";

import { Breadcrumb } from "flowbite-react";

const BreadcrumbComponent = ({
	icon,
	rootPage,
	item1,
	item2,
	item3,
	iconHref,
	item1Href,
}) => {
	return (
		<Breadcrumb aria-label="Default breadcrumb example">
			<Breadcrumb.Item href={iconHref} icon={icon}>
				{rootPage}
			</Breadcrumb.Item>
			{item1 && <Breadcrumb.Item href={item1Href}>{item1}</Breadcrumb.Item>}
			{item2 && <Breadcrumb.Item>{item2}</Breadcrumb.Item>}
			{item3 && <Breadcrumb.Item>{item3}</Breadcrumb.Item>}
		</Breadcrumb>
	);
};

export default BreadcrumbComponent;
